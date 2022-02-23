# [Choice] Debian OS version: bullseye, buster
ARG VARIANT=bullseye
FROM --platform=linux/amd64 mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

ENV DENO_INSTALL_ROOT=/deno DENO_INSTALL=/deno
RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && chown -R vscode ${DENO_INSTALL}

ENV PATH=${DENO_INSTALL_ROOT}/bin:~/.deno/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL_ROOT}/.cache/deno

RUN deno run --allow-run --allow-read https://deno.land/x/snel/install.ts \
    && deno install -Af --unstable --import-map=https://deno.land/x/trex/import_map.json -n trex --no-check https://deno.land/x/trex/cli.ts \
    && deno install -qAfn vr https://deno.land/x/velociraptor/cli.ts \
    && chown -R vscode ${DENO_INSTALL}