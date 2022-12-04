# Push only dockerfile
# Stage 2: Serve app with nginx server 

# Use official nginx image as the base image
FROM arm64v8/nginx:latest

RUN rm -rf /usr/share/nginx/html/*
# Copy the build output to replace the default nginx contents.
COPY nginx.conf /etc/nginx/nginx.conf
COPY  ./dist/fhtcommerce /usr/share/nginx/html
# Expose port 80
EXPOSE 80