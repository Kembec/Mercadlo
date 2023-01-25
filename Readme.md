# Mercadlo

Mercadlo is an app to create shopping lists. Developed in Vue 3 and Express with

## Installation

### Create keys for the server
- cd ./server/keys
- openssl genpkey -algorithm RSA -out private_key.pem -aes256 && openssl rsa -pubout -in private_key.pem -out public_key.pem
- openssl rsa -in private_key.pem -out decrypted_private_key.pem

### Create .env files
- cp ./client/.env.example ./client/.env
- cp ./server/.env.example ./server/.env

## Online Test

[Mercadlo](https://mercadlo.kembec.com)


## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)