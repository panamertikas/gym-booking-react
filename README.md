# GymBooking React Frontend

A gym booking management system frontend built with React and Vite.

## Technologies
- React 19
- Vite
- React Router DOM
- React DatePicker

## Prerequisites
- Node.js 18+
- Docker Desktop (for the backend)

## Build and Deploy

### Step 1: Start the Backend (Docker)

1. Stop local MySQL if running (Windows PowerShell as Administrator):
```bash
net stop MySQL80
```

2. Clone and start the backend:
```bash
git clone https://github.com/panamertikas/gym-booking-spring.git
cd gym-booking-spring
docker-compose up --build -d
```

The backend API will be available at `http://localhost:8080`

### Step 2: Start the Frontend (React)

1. Clone the repository:
```bash
git clone https://github.com/panamertikas/gym-booking-react.git
cd gym-booking-react
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173`

The Vite dev server proxies all `/api` requests to the backend at `http://localhost:8080`.

## Default Users
- Admin: `admin` / `admin123`
- Sample users (20 total): `nikos@gmail.com`, `maria@gmail.com`, `kostas@gmail.com`, etc. — all with password `123456`

## Pages

### Admin
- `/admin/members` - Members management
- `/admin/gym-classes` - Gym Classes management
- `/admin/bookings` - All bookings
- `/admin/register-member` - Register new member

### User
- `/dashboard` - Available classes with calendar booking
- `/my-bookings` - My bookings
- `/profile` - My profile

## Related Projects
- [GymBooking Spring Boot API](https://github.com/panamertikas/gym-booking-spring)