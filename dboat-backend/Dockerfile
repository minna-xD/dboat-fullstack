# -------- Build stage --------
FROM gradle:9.2.1-jdk21 AS build
WORKDIR /dboatapp
COPY . .
RUN gradle bootJar --no-daemon

# -------- Runtime stage --------
FROM eclipse-temurin:21-jre
WORKDIR /dboatapp
COPY --from=build /dboatapp/build/libs/*.jar dboatapp.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "dboatapp.jar"]