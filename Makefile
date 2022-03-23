DENO=deno compile --config backend/deno.json --import-map import_map.json --no-check --allow-read --allow-net --allow-env

clean:
	rm -r frontend/dist backend/dist

all_portable: \
	x86_64-unknown-linux-gnu-portable \
	x86_64-pc-windows-msvc-portable \
	x86_64-apple-darwin-portable \
	aarch64-apple-darwin-portable

backend/dist/frontend/:
	cd frontend
	deno task build
	cd ..
	./scripts/gen_openapi_spec.ts frontend/dist/swagger.json
	cp -r frontend/dist/ backend/dist/frontend/

copy_environment:
	mkdir -p backend/dist
	cp backend/.env.example backend/dist/.env

# static deno binaries
x86_64-unknown-linux-gnu:
	$(DENO) --target $@ -o backend/dist/jimmi-$@ backend/src/app.ts

x86_64-pc-windows-msvc:
	$(DENO) --target $@ -o backend/dist/jimmi-$@.exe backend/src/app.ts

x86_64-apple-darwin:
	$(DENO) --target $@ -o backend/dist/jimmi-$@ backend/src/app.ts

aarch64-apple-darwin:
	$(DENO) --target $@ -o backend/dist/jimmi-$@ backend/src/app.ts

# portable versions
x86_64-unknown-linux-gnu-portable: x86_64-unknown-linux-gnu backend/dist/frontend/ copy_environment
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-x86_64-unknown-linux-gnu \
		frontend \
		.env

x86_64-pc-windows-msvc-portable: x86_64-pc-windows-msvc backend/dist/frontend/ copy_environment
	cd backend/dist/ && zip -r jimmi-$@.zip \
		jimmi-x86_64-pc-windows-msvc.exe \
		frontend \
		.env

x86_64-apple-darwin-portable: x86_64-apple-darwin backend/dist/frontend/ copy_environment
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-x86_64-apple-darwin \
		frontend \
		.env

aarch64-apple-darwin-portable: aarch64-apple-darwin backend/dist/frontend/ copy_environment
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-aarch64-apple-darwin \
		frontend \
		.env
