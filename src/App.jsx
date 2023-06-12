import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Class from './pages/Class';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route element={<MainLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/etudiants" element={<Student />} />
					<Route path="/enseignants" element={<Teacher />} />
					<Route path="/lycee" >

						<Route path='class' element={<Class/>} ></Route>
						{/* <Route path='group' element={<Class/>} ></Route>
						<Route path='subject' element={<Class/>} ></Route> */}
	

					</Route>

				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
