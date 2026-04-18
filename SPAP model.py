# =====================================
# Smart Parking Availability Prediction
# =====================================

# 1. Import required libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

# 2. Load dataset
df = pd.read_csv("C:/Users/ASHWITHAA/OneDrive/Desktop/Smart Parking ML/SPSIRDATA.csv")
print("Dataset preview:")
print(df.head())
print("\nColumn names:")
print(df.columns)

# 3. Convert created_at to datetime
df['created_at'] = pd.to_datetime(df['created_at'])
# 4. Feature Engineering (time-based features)
df['Hour'] = df['created_at'].dt.hour

df['Minute'] = df['created_at'].dt.minute

# Convert time into minutes since midnight
df['Time_Minutes'] = df['Hour'] * 60 + df['Minute']

df['Day'] = df['created_at'].dt.dayofweek  # 0 = Monday

# 5. Create target variable
# field2: 1 = Occupied, 0 = Free
# Availability: 1 = Available, 0 = Not Available
df['Availability'] = np.where(df['field2'] == 0, 1, 0)

# 6. Encode parking slot (field1)
# Convert IR20, IR40, etc. into numbers
df['Slot_ID'] = df['field1'].astype('category').cat.codes

print(df.head())

# 7. Select features and target
X = df[['Time_Minutes', 'Day', 'Slot_ID']]
y = df['Availability']

# 8. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 9. Train Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# 10. Evaluate the model
y_pred = model.predict(X_test)

print("\nModel Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# 11. Save the trained model
joblib.dump(model, "smart_parking_model.pkl")

print("\n Model trained and saved successfully!")
