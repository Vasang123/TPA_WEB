import { useEffect, useState } from "react";
import { BackButton, MainDivBg } from "../Other/GlobalComponent";
import style from '@/styles/Admin/data.module.scss'
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function DataSummary() {
    const [five, setFive] = useState(0)
    const [four, setFour] = useState(0)
    const [three, setThree] = useState(0)
    const [two, setTwo] = useState(0)
    const [one, setOne] = useState(0)
    const [averageRating, setAverageRating] = useState(0)
    const [totalSold, setTotalSold] = useState(0)
    const [totalReview, setTotalReview] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/data/list`)
            const data = await res.json()
            console.log(data);
            setFive(data.fiveRating)
            setFour(data.fourRating)
            setThree(data.threeRating)
            setTwo(data.twoRating)
            setOne(data.oneRating)
            setAverageRating(data.averageRatings)
            setTotalProducts(data.totalProducts)
            setTotalSold(data.totalSolds)
            setTotalReview(data.totalReviews)

        }
        fetchData();

    }, [totalProducts])
    const data = [
        { name: 'Five Stars', value: five },
        { name: 'Four Stars', value: four },
        { name: 'Three Stars', value: three },
        { name: 'Two Stars', value: two },
        { name: 'One Star', value: one }
    ];
    const data2 = [
        { name: 'Average Rating', value: averageRating },
        { name: 'Total Product', value: totalProducts },
        { name: 'Total Sold', value: totalSold },
        { name: 'Total Review', value: totalReview },
    ];

    const COLORS = ['#FF6384', '#36A2EB', '#018667', '#FF3213', '#FF9900'];
    return (
        <MainDivBg className={style.template}>
            <BackButton target="/admin/home" />
            <div className={style.data_container}>
                <div className={style.temp}>
                    <div className={style.top}>
                        <h1>Old Egg Data Summary</h1>
                    </div>

                    <div className={style.graph}>
                        <div className={style.pie}>
                            <h3>Rating Summary</h3>
                            <PieChart width={500} height={400} >
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#8884d8"
                                    labelLine={false}
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        value,
                                        index,
                                    }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill={COLORS[index % COLORS.length]}
                                                textAnchor={x > cx ? "start" : "end"}
                                                dominantBaseline="central"
                                            >
                                                {`${data[index].name} (${value} %)`}
                                            </text>
                                        );
                                    }}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        <div className={style.middle}>
                            <h3>General Summary</h3>
                            <BarChart width={600} height={300} data={data2}>
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>

                        </div>
                    </div>
                </div>
            </div>

        </MainDivBg>
    )
}
