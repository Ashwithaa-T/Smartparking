# Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay, mean_absolute_error
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta
import joblib

# Load Dataset
df = pd.read_csv("C:/Users/ASHWITHAA/OneDrive/Desktop/Smart Parking ML/SPSIRDATA.csv")
df['created_at'] = pd.to_datetime(df['created_at'])

# Feature Engineering
df['Time_Minutes'] = df['created_at'].dt.hour * 60 + df['created_at'].dt.minute
df['Day'] = df['created_at'].dt.dayofweek
df['Is_Weekend'] = (df['Day'] >= 5).astype(int)
df['Availability'] = np.where(df['field2'] == 0, 1, 0)
df['Slot_ID'] = df['field1'].astype('category').cat.codes
df = df.sort_values(by=['Slot_ID', 'created_at'])
df['Prev_Status'] = df.groupby('Slot_ID')['Availability'].shift(1).fillna(0)
df['Rolling_Availability'] = (
    df.groupby('Slot_ID')['Availability']
    .rolling(3)
    .mean()
    .reset_index(0, drop=True)
    .fillna(0)
)

# Train Model
X = df[['Time_Minutes', 'Day', 'Slot_ID', 'Prev_Status', 'Is_Weekend', 'Rolling_Availability']]
y = df['Availability']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.4f} ({accuracy * 100:.2f}%)")

# Estimate Occupied Duration
df['Next_Time'] = df.groupby('Slot_ID')['created_at'].shift(-1)
df['Duration'] = (df['Next_Time'] - df['created_at']).dt.total_seconds() / 60

df_reg = df[df['Availability'] == 0]
df_reg = df_reg[(df_reg['Duration'] > 1) & (df_reg['Duration'] < 180)].copy()

# Drop rows with NaN in features or target
df_reg.dropna(subset=['Time_Minutes', 'Day', 'Slot_ID', 'Is_Weekend', 'Duration'], inplace=True)

# Train Regression Model for Duration
X_dur = df_reg[['Time_Minutes', 'Day', 'Slot_ID', 'Is_Weekend']]
y_dur = df_reg['Duration']

X_dur_train, X_dur_test, y_dur_train, y_dur_test = train_test_split(
    X_dur, y_dur, test_size=0.2, random_state=42
)

duration_model = RandomForestRegressor(n_estimators=100, random_state=42)
duration_model.fit(X_dur_train, y_dur_train)

y_dur_pred = duration_model.predict(X_dur_test)
mae = mean_absolute_error(y_dur_test, y_dur_pred)
print(f"Duration Model MAE: {mae:.2f} minutes")

# Prediction Function
def predict_parking(time_minutes, day, slot_id, prev_status=0, is_weekend=0, rolling=0):
    inp = pd.DataFrame({
        'Time_Minutes': [time_minutes],
        'Day': [day],
        'Slot_ID': [slot_id],
        'Prev_Status': [prev_status],
        'Is_Weekend': [is_weekend],
        'Rolling_Availability': [rolling]
    })

    pred = model.predict(inp)[0]

    if pred == 1:
        return "Slot is Available Now"

    # Predict duration using ML Model
    dur_inp = pd.DataFrame({
        'Time_Minutes': [time_minutes],
        'Day': [day],
        'Slot_ID': [slot_id],
        'Is_Weekend': [is_weekend]
    })
    duration = duration_model.predict(dur_inp)[0]
    available_time = datetime.now() + timedelta(minutes=int(duration))

    return (
        f"Slot is Occupied.\n"
        f"Expected Available At: {available_time.strftime('%I:%M %p')}"
    )

# Example Test
result = predict_parking(
    time_minutes=600,
    day=2,
    slot_id=2
)

print("\nPrediction Result:")
print(result)

# Save Model
joblib.dump(model, "availability_model.pkl")
joblib.dump(duration_model, "duration_model.pkl")
print("Model saved successfully")

# Plot Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=['Occupied', 'Available']
)
disp.plot()
plt.title("Confusion Matrix")
plt.tight_layout()
plt.show()

# Plot Average Occupied Duration
plt.figure(figsize=(8, 4))
avg_duration_original = (
    df_reg.groupby('field1')['Duration']
    .mean()
    .sort_index()
)
avg_duration_original.plot(kind='bar')
plt.title("Average Occupied Duration per Slot")
plt.xlabel("Original Slot Number")
plt.ylabel("Average Duration (minutes)")
plt.tight_layout()
plt.show()