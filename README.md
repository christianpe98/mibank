# mibank

## Funcionalidades

### Ingresar dinero

    - Solo se podrá ingresar dinero a la cuenta asociada a la tarjeta
    - Solo se podrá ingresar dinero a una cuenta desde un cajero del mismo banco

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

### Transferencias

### Consultar movimientos

### Activar tarjeta

### Cambiar pin
