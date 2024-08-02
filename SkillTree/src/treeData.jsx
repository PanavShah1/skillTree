const treeData = [
    [
        {
            id: 1,
            code: 'MA615',
            name: 'Linear Algebra 3',
            course_offered: false,
            instructor: '',
            children: [
                [
                    {
                        id: 2,
                        code: 'MA410',
                        name: 'Linear Algebra 2',
                        course_offered: true,
                        instructor: 'Dr. John Doe',
                        children: [
                            [
                                {
                                    id: 3,
                                    code: 'MA110',
                                    name: 'Algebra',
                                    course_offered: true,
                                    instructor: 'Dr. Jane Doe',
                                    children: [],
                                },
                                {
                                    id: 4,
                                    code: 'MA210',
                                    name: 'Geometry',
                                    course_offered: true,
                                    instructor: 'Dr. Mary Doe',
                                    children: []
                                }
                            ]
                            
                        ],
                    },
                // ],
                // [
                    {
                        id: 6,
                        code: 'MA420',
                        name: 'Group Theory',
                        course_offered: false,
                        instructor: '',
                        children: [],
                    },
                ],
                [
                    {
                        id: 7,
                        code: 'MA430',
                        name: 'Topology',
                        course_offered: true,
                        instructor: 'Dr. Richard Roe',
                        children: [
                            [
                                {
                                    id: 8,
                                    code: 'MA130',
                                    name: 'Calculus',
                                    course_offered: false,
                                    instructor: '',
                                    children: [
                                            [
                                                {
                                                    id: 10,
                                                    code: 'MA140',
                                                    name: 'Differential Equations',
                                                    course_offered: true,
                                                    instructor: 'Dr. Richard Roe',
                                                    children: []
                                                }
                                        ]
                                    ]
                                },
                                {
                                    id: 9,
                                    code: 'MA230',
                                    name: 'Analysis',
                                    course_offered: false,
                                    instructor: '',
                                    children: []
                                }
                            ]
                        ],
                    }
                ]
            ]
        },
    ],
    [
        {
            id: 5,
            code: 'MA520',
            name: 'Number Theory',
            course_offered: true,
            instructor: 'Dr. John Doe',
            children: [
                [
                    {
                        id: 12,
                        code: 'MA240',
                        name: 'Statistics',
                        course_offered: true,
                        instructor: 'Dr. Mary Doe',
                        children: []
                    }
                ]
            ],
        },
        {
            id: 11,
            code: 'MA530',
            name: 'Differential Geometry',
            course_offered: false,
            instructor: '',
            children: []
        }
    ]
];

export default treeData;