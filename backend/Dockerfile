FROM denoland/deno:distroless

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN ["deno", "cache", "deps.ts"]

COPY backend/ /app/
COPY import_map.json .
WORKDIR /app


# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN ["deno", "cache", "--no-check", "src/app.ts"]

EXPOSE 8000
ENV PORT 8000
CMD ["run", "--no-check", "--allow-net", "--allow-read", "--allow-env", "src/app.ts"]
