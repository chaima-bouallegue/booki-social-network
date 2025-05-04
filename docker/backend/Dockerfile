# Build stage
# -------- Build stage --------
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
# -------- Runtime stage --------
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/app.jar
EXPOSE 8088

ENV SPRING_PROFILES_ACTIVE=$PROFILE
ENV APP_VERSION=$APP_VERSION

# Variables d'environnement pour la base de données et MailDev
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV MAILDEV_URL=mail-dev-bsn

# Active profile et version
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

# Commande d'exécution du JAR
CMD ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Dspring.datasource.url=${DB_URL}", "app.jar"]
