import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Class from './pages/Class';
import Group from './pages/Group';
import Subject from './pages/Subject';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route element={<MainLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/etudiants" element={<Student />} />
					<Route path="/enseignants" element={<Teacher />} />
					<Route path="/class" element={<Class />} />
					<Route path="/group" element={<Group />} />
					<Route path="/subject" element={<Subject />} />
					
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
