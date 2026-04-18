# Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix
import matplotlib.pyplot as plt
import joblib

# Load dataset
df = pd.read_csv("C:/Users/ASHWITHAA/OneDrive/Desktop/Smart Parking ML/SPSIRDATA.csv")
print(df.head())

# Convert created_at to datetime
df['created_at'] = pd.to_datetime(df['created_at'])

# Feature Engineering
df['Hour'] = df['created_at'].dt.hour
df['Minute'] = df['created_at'].dt.minute
df['Time_Minutes'] = df['Hour'] * 60 + df['Minute']
df['Day'] = df['created_at'].dt.dayofweek

# Weekend feature
df['Is_Weekend'] = df['Day'].apply(lambda x: 1 if x >= 5 else 0)

# Target Variable
df['Availability'] = np.where(df['field2'] == 0, 1, 0)

# Encode Slot
df['Slot_ID'] = df['field1'].astype('category').cat.codes

# Sort data
df = df.sort_values(by=['Slot_ID', 'created_at'])

# Previous Status Feature
df['Prev_Status'] = df.groupby('Slot_ID')['Availability'].shift(1)
df['Prev_Status'] = df['Prev_Status'].fillna(0)

# Rolling Feature (
df['Rolling_Availability'] = df.groupby('Slot_ID')['Availability'] \
                                .rolling(window=3).mean().reset_index(0, drop=True)
df['Rolling_Availability'] = df['Rolling_Availability'].fillna(0)

# Features & Target
X = df[['Time_Minutes', 'Day', 'Slot_ID', 'Prev_Status', 'Is_Weekend', 'Rolling_Availability']]
y = df['Availability']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Logistic Regression Model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation
accuracy = accuracy_score(y_test, y_pred)
print("\nModel Accuracy:", accuracy)
print("\nConfusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Bar Graph (Availability Distribution)
availability_counts = df['Availability'].value_counts()
plt.figure()
availability_counts.plot(kind='bar')
plt.title("Parking Availability Distribution")
plt.xlabel("0 = Not Available, 1 = Available")
plt.ylabel("Count")
plt.show()

# Save Model
joblib.dump(model, "smart_parking_logistic_model.pkl")  
