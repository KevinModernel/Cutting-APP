# Cutting APP
 
 Local APP to follow cutting weight phase.
 
 ### App developed with: 
 
 NodeJS - Express - Sequelize - PostgreSQL - PUG.

### Review:
 
Primero se crea una nueva etapa, definiendo el nombre, peso, porcentaje de grasa corporal y fecha de inicio.

Si ya se tiene creada una etapa, tan solo se la selecciona del listado que en la parte inferior.
 
![Inicio](https://user-images.githubusercontent.com/114360790/214720748-818d56c2-0f3b-40f8-8003-adcece294ded.jpg)

Luego, una vez creada la etapa, se redirecciona a definir los objetivos de la etapa. Cargando el peso, el porcentaje de grase corporal y la fecha final.

![Objetivos](https://user-images.githubusercontent.com/114360790/214721130-2ff645d6-b13d-4231-bbeb-f2408c0afd30.jpg)

Ahora sí ya se puede pasar al panel de la etapa creada.

Allí se puede ir cargando el par de datos Peso / Fecha, de cada día de la etapa de definición. Estos valores se almacenan en la Base de Datos, junto con los valores de variación de peso con respecto al día anterior (Delta Peso), y el peso objetivo del día (Peso Inicial - Pérdida Diaría Objetivo).

A su vez se va actualizando automáticamente el gráfico, para realizar el seguimiento del progreso.

![Final](https://user-images.githubusercontent.com/114360790/214721617-b01d1ef9-66a2-4ae4-aa34-6da6f7ffdfd0.jpg)


Los valores almacenados en la base de datos relacional PostgreSQL siguen las siguientes relaciones:

Journey -> Goals (One-to-one)
Journey -> DailyProgress (One-to-many)

![Representacion model SQL](https://user-images.githubusercontent.com/114360790/214721772-3274bf69-e7dc-4052-a5ec-7429e8b28f41.jpg)
