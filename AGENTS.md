# Base44 Development Notes

- Run the project with `docker compose -f docker-compose.base44.yml up -d`.
- The `app` service builds dependencies into `Dockerfile.base44`, then runs the Vite frontend and Express API from bind-mounted source with live reload; MongoDB runs in the `mongo` service.
- Browser API calls use the Vite `/api` proxy so authentication cookies remain same-origin in preview.
- Core email/password authentication works with local MongoDB. Google OAuth and Cloudinary uploads require their optional environment credentials.
- Verify the frontend with `curl http://localhost:3000/` and the API proxy with `curl http://localhost:3000/api/hello`.
