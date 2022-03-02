DENO=deno compile --config backend/deno.json --import-map import_map.json --no-check --allow-read --allow-net

clean:
	rm -r frontend/dist backend/dist

all_portable: \
	x86_64-unknown-linux-gnu-portable \
	x86_64-pc-windows-msvc-portable \
	x86_64-apple-darwin-portable \
	aarch64-apple-darwin-portable

backend/dist/frontend/:
	cd frontend
	trex run build
	cp -r frontend/dist/ backend/dist/frontend/

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
x86_64-unknown-linux-gnu-portable: x86_64-unknown-linux-gnu backend/dist/frontend/
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-x86_64-unknown-linux-gnu \
		frontend

x86_64-pc-windows-msvc-portable: x86_64-pc-windows-msvc backend/dist/frontend/
	cd backend/dist/ && zip -r jimmi-$@.zip \
		jimmi-x86_64-pc-windows-msvc.exe \
		frontend

x86_64-apple-darwin-portable: x86_64-apple-darwin backend/dist/frontend/
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-x86_64-apple-darwin \
		frontend

aarch64-apple-darwin-portable: aarch64-apple-darwin backend/dist/frontend/
	tar czf backend/dist/jimmi-$@.tar.gz -C backend/dist/ \
		jimmi-aarch64-apple-darwin \
		frontend
