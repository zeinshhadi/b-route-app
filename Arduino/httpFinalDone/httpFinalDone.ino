#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

const char *ssid = "as";
const char *password = "1234567890";
const char *serverUrl = "http://192.168.43.64:8000/api/update/seat";

const int buttonPins[] = {D2, D3, D4, D5, D6, D7, D8, D1, D0}; 
const int numButtons = 9;  
bool buttonState[numButtons] = {false}; 

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  for (int i = 0; i < numButtons; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);
  }

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(200);
  }

  Serial.println("\nConnected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Mac Address: ");
  Serial.println(WiFi.macAddress());
}

void loop() {
  for (int i = 0; i < numButtons; i++) {
    int buttonStateNow = digitalRead(buttonPins[i]);

    if (buttonStateNow == LOW && !buttonState[i]) {
      Serial.print("Button ");
      Serial.print(i + 1);
      Serial.println(" pressed");
      buttonState[i] = true;
      sendHttpRequest(i + 1, buttonState[i]);  // Send the seat number and its state
    } else if (buttonStateNow == HIGH && buttonState[i]) {
      buttonState[i] = false;
    }
  }
}

void sendHttpRequest(int seatNumber, bool seatStatus) {
  Serial.print("Sending HTTP request for seat ");
  Serial.print(seatNumber);
  Serial.print(" with status ");
  Serial.println(seatStatus ? "true" : "false");

  // Create a JSON object
  StaticJsonDocument<64> doc;
  doc["seat_number"] = seatNumber;
  doc["status"] = seatStatus;


  String requestBody;
  serializeJson(doc, requestBody);


  sendHttpRequest(requestBody);
}

void sendHttpRequest(String requestBody) {
  HTTPClient http;
  WiFiClient client;

  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(requestBody);
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP Request failed. Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
