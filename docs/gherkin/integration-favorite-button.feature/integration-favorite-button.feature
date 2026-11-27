Feature: Marcar y desmarcar una película como favorita desde el botón

  Scenario: El botón indica la acción disponible
    Given una película que no es favorita
    When se muestra el botón
    Then el botón tiene el texto accesible "Añadir <título> a favoritas"

  Scenario: Usuario sin sesión es enviado al login
    Given un usuario sin sesión iniciada
    When pulsa el botón de favorita
    Then se navega a "/login" con el returnUrl de la página actual
    And no se guarda nada

  Scenario: Usuario con sesión añade una favorita
    Given un usuario con sesión iniciada y una película que no es favorita
    When pulsa el botón de favorita
    Then se guarda la película con isFavorite true
    And se muestra el mensaje "Añadida a favoritas"

  Scenario: Falla el guardado
    Given un usuario con sesión iniciada y un servicio que da error
    When pulsa el botón de favorita
    Then se muestra el mensaje "No se pudo actualizar el favorito."
    And el botón vuelve a estar habilitado