FROM denoland/deno:debian as APP_BUILDER
WORKDIR /app
COPY . . 
RUN ["deno", "run", "--allow-run", "--allow-read", "https://deno.land/x/snel/install.ts"]
RUN ["snel", "build"]


FROM nginx:1.21.6 as NGINX_BUILDER
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/jimmi.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /opt/var/cache/nginx && \
    cp -a --parents /usr/lib/nginx /opt && \
    cp -a --parents /usr/share/nginx /opt && \
    cp -a --parents /var/log/nginx /opt && \
    cp -aL --parents /var/run /opt && \
    cp -a --parents /etc/nginx /opt && \
    cp -a --parents /usr/sbin/nginx /opt && \
    cp -a --parents /usr/sbin/nginx-debug /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libdl.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libpthread* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libcrypt* /opt && \
    cp -a --parents /usr/lib/x86_64-linux-gnu/libpcre* /opt && \
    cp -a --parents /usr/lib/x86_64-linux-gnu/libssl.so.* /opt && \
    cp -a --parents /usr/lib/x86_64-linux-gnu/libcrypto.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libz.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libc* /opt && \
    cp -a --parents /lib64/ld-linux-x86-64.so* /opt


FROM gcr.io/distroless/base-debian11
COPY --from=NGINX_BUILDER /opt /
COPY --from=APP_BUILDER /app/dist /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
