# mibank

## Funcionalidades

### Ingresar dinero

    - Solo se podrá ingresar dinero a la cuenta asociada a la tarjeta
    - El pin deberá coincidir con el de la tarjeta

#### Modelo

- Bank:

  - id
  - name: string

- Account:

  - id
  - IBAN: string
  - amount: number
  - bank: many-to-one

- Card:
  - id
  - number: number
  - pin: number
  - account: one-to-one (?)

### Sacar dinero

    - Solo se podrá ingresar dinero a la cuenta asociada a la tarjeta
    - El pin deberá coincidir con el de la tarjeta

### Transferencias

### Consultar movimientos

### Activar tarjeta

### Cambiar pin

# Comentarios

- He simplificado le funcionalidad de sacar dinero
- Los test de integración de service fallan porque creo que el pool no está obteniendo las variables de entorno para poder hacer la conexión con la base de datos
