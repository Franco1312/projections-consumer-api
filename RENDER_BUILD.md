# Render Build Configuration

## Build Command
```bash
npm install --include=dev && npm run build
```

**Alternative (if npm version < 9):**
```bash
NPM_CONFIG_PRODUCTION=false npm install && npm run build
```

## Start Command
```bash
npm start
```

## Environment Variables Required
- `NODE_ENV` (set to `production` by Render)
- `PORT` (automatically set by Render)
- `DB_HOST`
- `DB_PORT` (optional, default: 5432)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_SSL` (optional, default: false)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Optional Environment Variables
- `DB_POOL_MAX` (default: 10)
- `DB_IDLE_TIMEOUT` (default: 30000)
- `DB_CONNECTION_TIMEOUT` (default: 10000 - increased for remote connections)
- `LOG_LEVEL` (default: info)

## Troubleshooting Database Connection Issues

If you get "Connection terminated due to connection timeout":

1. **Verify environment variables are set correctly in Render:**
   - `DB_HOST` - Should be the full hostname (e.g., `your-db.xxxxx.us-east-1.rds.amazonaws.com`)
   - `DB_PORT` - Usually `5432`
   - `DB_NAME` - Database name
   - `DB_USER` - Database username
   - `DB_PASSWORD` - Database password
   - `DB_SSL` - Set to `true` if using AWS RDS or other managed databases

2. **For AWS RDS:**
   - Ensure `DB_SSL=true` is set
   - Verify security groups allow connections from Render's IP ranges
   - Check if the database is publicly accessible or requires VPC configuration

3. **Increase connection timeout if needed:**
   - Set `DB_CONNECTION_TIMEOUT=30000` (30 seconds) for slower connections

