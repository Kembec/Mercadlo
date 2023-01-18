
openssl genpkey -algorithm RSA -out private_key.pem -aes256 && openssl rsa -pubout -in private_key.pem -out public_key.pem


openssl rsa -in private_key.pem -out decrypted_private_key.pem