package com.chatbot;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class ChatbotApp extends Application {
    private static final Logger logger = LoggerFactory.getLogger(ChatbotApp.class);

    @Override
    public void start(Stage stage) throws IOException {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(ChatbotApp.class.getResource("/fxml/chatbot-view.fxml"));
            Scene scene = new Scene(fxmlLoader.load(), 800, 600);

            // Load CSS styling
            String css = ChatbotApp.class.getResource("/css/style.css").toExternalForm();
            scene.getStylesheets().add(css);

            stage.setTitle("SUNYBOT - Elevator AI Assistant");
            stage.setScene(scene);
            stage.setMinWidth(600);
            stage.setMinHeight(400);
            stage.show();

            logger.info("Chatbot application started successfully");
        } catch (Exception e) {
            logger.error("Failed to start application", e);
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
