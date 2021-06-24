# Create a new admin user

## 1. Insert a new row in users table

### for password field:

generate a new secure password
```sh
NEWPASSWORD=$(pwgen -ys 15 1)
```

get password hash output
```sh
echo "$NEWPASSWORD" | htpasswd -bnBC 10 "" password | tr -d ':\n'
```

## 2. Insert a new row in user_role table

user_id: (put the new created user id)
role_id: 1 (1 is admin, check in role table for all roles)
