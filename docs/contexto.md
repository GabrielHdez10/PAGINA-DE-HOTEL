# Vista de Contexto (C4 Model)

Este diagrama muestra cómo interactúa el sistema con usuarios y servicios externos.

```mermaid
flowchart LR
    U[Usuario / Cliente]
    A[Administrador]
    S[Sistema de Reservación de Hotel]
    DB[(Base de Datos)]
    P[Pasarela de Pago]
    E[Servicio de Correo]

    U -->|Consulta habitaciones y reserva| S
    A -->|Administra el sistema| S
    S -->|Guarda datos| DB
    S -->|Procesa pagos| P
    S -->|Envía confirmaciones| E
