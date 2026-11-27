Feature: Decidir si una entrada de usuario se elimina de Firestore

  Scenario Outline: Una entrada se elimina solo si no es favorita y no tiene puntuación
    Given una película con isFavorite "<favorita>" y rating "<rating>"
    When se evalúa si debe eliminarse
    Then el resultado es "<eliminar>"

    Examples:
      | favorita | rating | eliminar | 
      | false    | null   | true     | # vacía: no aporta nada, se borra
      | true     | null   | false    | # puntuada: se mantiene
      | false    | 8      | false    | # favorita: se mantiene
      | true     | 8      | false    | # favorita y puntuada: se mantiene