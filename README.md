# Cloudflare Worker Assignment

This project contains a basic Cloudflare Worker function.

## Project Structure

- `wrangler.toml` - Configuration file for Wrangler (Cloudflare's CLI tool)
- `src/index.js` - Main entry point for the Worker script

## Usage

1. **Install Wrangler:**
   ```sh
   npm install -g wrangler
   ```
2. **Preview the Worker locally:**
   ```sh
   wrangler dev
   ```
3. **Publish to Cloudflare:**
   ```sh
   wrangler publish
   ```

## Function Overview

The Worker function is defined in `src/index.js`. It handles HTTP requests and provides a basic response. You can modify this file to implement your desired logic.

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
