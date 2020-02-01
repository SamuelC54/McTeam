 
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
long duration, cm;
 
void setup() {
  //Serial Port begin
  Serial.begin(115200);
  //Define inputs and outputs
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}
 
void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
 
  cm = (duration/2) / 29.1;

  Serial.println(cm);  
  delay(1000);  
}
