 Feature: Decidir si una entrada de usuario se elimina de Firestore

  Scenario Outline: 
  Una entrada se elimina solo si no es favorita y no tiene puntuación
    Given -> una película con isFavorite "<favorita>" y rating "<rating>"
    When -> se evalúa si debe eliminarse
    Then -> el resultado es "<eliminar>"

    Ejemplos:
    
      | favorita | rating | eliminar |   Objetivo   |   porque   |
      ───────────────────────────────────────────────────────────────────
      | false    | null   | true     | se borra     | vacio      |
      | true     | null   | false    | se mantiene  | favoritas  |
      | false    | 8      | false    | se mantiene  | puntuación |
      | true     | 8      | false    | se mantiene  | ambas      |
      