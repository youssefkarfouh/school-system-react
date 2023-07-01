import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchStudents} from '../services/student';
import { Bar, Pie } from "react-chartjs-2";
import { Table } from 'antd';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
};

const labels = ['Filles', 'Garcons'];

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
      backgroundColor: "red"
    },
    {
      label: 'Garcons',
      data: [10, 15],
      backgroundColor: 'rgba(53, 162, 0, 0.5)',
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
		setStudents(data.slice(0 ,10));
	};
  useEffect(() => {
		getAllStudent();
	}, []);
  return (
    <>
      <h4>Tableau de bord</h4>

      <div className="mt-5 dashboard">
        <div className="cards_box">
          <div>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
          <div>
            <h5>456</h5>
            <h6>Total Etudiants</h6>
          </div>
        </div>
        <div className="row charts mt-5 justify-content-between">
          <div className='col-md-5'>
            <div className='box'>
              <h6>Text</h6>
              <div>
                <Bar options={options} data={barData} />
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='box'>
              <h6>Text</h6>
              <div></div>
            </div>
          </div>
        </div>
        <div className="row  charts mt-5 justify-content-between">
          <div className='col-md-8'>
            <div className='box h-100'>
              <h6>Dernies etudiants inscrits</h6>
              <div>
                <Table rowKey={(record) => record.id} columns={columns} dataSource={students} />
              </div>
            </div>

          </div>
          <div className='col-md-4'>
            <div className='box h-100'>
              <h6>Students</h6>
              <div>
                <Pie options={options} data={pieData} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard


