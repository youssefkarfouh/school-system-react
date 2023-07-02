import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale,PointElement, LineElement , LinearScale, ArcElement, BarElement, Title, Tooltip, Legend , TimeScale,} from 'chart.js';
import { fetchStudents} from '../services/student';
import { Bar, Pie,Line } from "react-chartjs-2";
import { Table } from 'antd';

ChartJS.register(CategoryScale, TimeScale, LinearScale, BarElement,PointElement,LineElement, ArcElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
};



// chart labels
const labels = ['Filles', 'Garcons'];


// charts data
const pieData = {
  labels ,
  datasets: [
    {
      data: [5, 9],
      backgroundColor: ["#8A70D6", "#e9e3fe"]
    },

  ],
};
const barData = {
  labels,
  datasets: [
    {
      label: 'Filles',
      data: [5, 9],
      backgroundColor: "#dfedf8"
    },
    {
      label: 'Garcons',
      data: [10, 15],
      backgroundColor: '#d9f7e8',
    },
  ],
};


function Dashboard() {

  const [students, setStudents] = useState([]);

  
	const columns = [
		{
			title: 'First Name',
			dataIndex: 'fname',
			key: "fname"
		},
		{
			title: 'Last Name',
			dataIndex: 'lname',
			key: "lname"
		},
		{
			title: 'Genre',
			dataIndex: 'genre',
			key: "genre"
		},
		{
			title: 'Birth',
			dataIndex: 'birth',
			key: "birth"
		},
		
		{
			title: 'Group',
			dataIndex: 'group',
			key: "group"
		},
	];
  async function getAllStudent() {
		const data = await fetchStudents();
		console.log("data", data)
		setStudents(data.slice(0 ,5));
	};
  useEffect(() => {
		getAllStudent();
	}, []);
  return (
    <>
      <h4>Tableau de bord</h4>

      <div className="mt-5 dashboard">
        <div className="cards_box">
          <div style={{backgroundColor:"#dfedf8"}}>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div style={{backgroundColor:"#fbecd8"}}>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div style={{backgroundColor:"#ffe1e2"}}>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div style={{backgroundColor:"#d9f7e8"}}>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
        </div>
        <div className="row charts mt-5 justify-content-between">
          <div className='col-md-8'>
            <div className='box'>
              <h6 className='mb-5'>Students</h6>
              <div>
                <Bar options={options} data={barData} />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='box'>
              <h6 className='mb-5'>Students</h6>
              <div>
                <Pie options={options} data={pieData} />
              </div>
            </div>
          </div>
        </div>
        <div className="row  charts mt-5 justify-content-between">
          <div className='col-12'>
            <div className='box h-100'>
              <h6 className='mb-5'>Dernies etudiants inscrits</h6>
              <div>
                <Table rowKey={(record) => record.id} columns={columns} dataSource={students} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard


