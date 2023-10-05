# Installing and Configuring PostgreSQL

## Installing On Ubuntu 22.04

1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

2. Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

3. Start & Enable PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

4. Create a new user

```bash
sudo -u postgres
psql
```

## Installing on MacOS

1. Install PostgreSQL

```bash
brew install postgresql@16
```

2. Start & Enable PostgreSQL Service

```bash
brew services start postgresql@16
```

3. Connect to PostgreSQL

```bash
psql -d postgres
```

## Configuring PostgreSQL

After connecting to PostgreSQL, run the following commands to create a new user and database.

```sql
CREATE DATABASE example;
CREATE USER example WITH ENCRYPTED PASSWORD 'Temporal1!';
GRANT ALL PRIVILEGES ON DATABASE example TO example WITH GRANT OPTION;
ALTER USER example WITH SUPERUSER;
```
