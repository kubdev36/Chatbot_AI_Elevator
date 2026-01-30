package com.chatbot;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javafx.application.Platform;
import javafx.concurrent.Task;
import javafx.fxml.FXML;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class ChatbotController {

    @FXML
    private VBox chatContainer;

    @FXML
    private ScrollPane chatScrollPane;

    @FXML
    private TextField messageInput;

    @FXML
    private Button sendButton;

    @FXML
    private Label statusLabel;

    private Image userIcon;
    private Image botIcon;

    // Cấu hình API
    private static final String API_URL = "http://127.0.0.1:8000/chat";
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final Gson gson = new Gson();

    @FXML
    public void initialize() {
        // Tải icon từ resources để dùng lại nhiều lần
        try {
            userIcon = new Image(getClass().getResourceAsStream("/images/user.png"));
            botIcon = new Image(getClass().getResourceAsStream("/images/logo.png"));
        } catch (Exception e) {
            System.err.println("Lỗi tải icon: " + e.getMessage());
        }

        // Gán sự kiện
        sendButton.setOnAction(event -> sendMessage());
        messageInput.setOnAction(event -> sendMessage());

        // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
        chatContainer.heightProperty().addListener((observable, oldValue, newValue) -> {
            chatScrollPane.setVvalue(1.0);
        });
    }

    private void sendMessage() {
        String message = messageInput.getText().trim();
        if (message.isEmpty())
            return;

        // 1. Hiển thị tin nhắn của User (kèm icon User)
        addMessage(message, true);
        messageInput.clear();
        statusLabel.setText("Trạng thái: Đang xử lý...");

        // 2. Gọi API trong nền (Background Thread)
        Task<String> task = new Task<>() {
            @Override
            protected String call() throws Exception {
                JsonObject requestBody = new JsonObject();
                requestBody.addProperty("question", message);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(API_URL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString(), StandardCharsets.UTF_8))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    JsonObject jsonResponse = gson.fromJson(response.body(), JsonObject.class);
                    return jsonResponse.get("answer").getAsString();
                } else {
                    return "Lỗi kết nối: " + response.statusCode();
                }
            }
        };

        task.setOnSucceeded(e -> {
            String botResponse = task.getValue();
            // 3. Hiển thị phản hồi của Bot (kèm icon Bot)
            addMessage(botResponse, false);
            statusLabel.setText("Trạng thái: Sẵn sàng");
        });

        task.setOnFailed(e -> {
            addMessage("Xin lỗi, không thể kết nối đến server.", false);
            statusLabel.setText("Trạng thái: Lỗi kết nối");
            e.getSource().getException().printStackTrace();
        });

        new Thread(task).start();
    }

    private void addMessage(String text, boolean isUser) {
        // Tạo HBox chứa icon và tin nhắn
        HBox hbox = new HBox();
        hbox.setSpacing(10);

        // Tạo ImageView cho icon
        ImageView iconView = new ImageView(isUser ? userIcon : botIcon);
        iconView.setFitHeight(35);
        iconView.setFitWidth(35);
        iconView.setPreserveRatio(true);

        // Tạo Label cho nội dung tin nhắn
        Label messageLabel = new Label(text);
        messageLabel.setWrapText(true);
        messageLabel.setMaxWidth(500); // Giới hạn chiều rộng tin nhắn

        // Style chung (bo góc, đổ bóng)
        String commonStyle = "-fx-padding: 10; -fx-background-radius: 10; -fx-effect: dropshadow(three-pass-box, rgba(0,0,0,0.1), 5, 0, 0, 1);";

        if (isUser) {
            hbox.setAlignment(Pos.CENTER_RIGHT);
            messageLabel.setStyle(commonStyle + " -fx-background-color: #BBDEFB;"); // Màu xanh nhạt cho User
            hbox.getChildren().addAll(messageLabel, iconView); // Text trước, Icon sau
        } else {
            hbox.setAlignment(Pos.CENTER_LEFT);
            messageLabel.setStyle(commonStyle + " -fx-background-color: #FFFFFF;"); // Màu trắng cho Bot
            hbox.getChildren().addAll(iconView, messageLabel); // Icon trước, Text sau
        }

        // Thêm vào giao diện (đảm bảo chạy trên JavaFX Thread)
        Platform.runLater(() -> chatContainer.getChildren().add(hbox));
    }
}