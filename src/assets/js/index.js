document.addEventListener('DOMContentLoaded', function () {
    const chartDom = document.getElementById('Pagos-departamento');
    const myChart = echarts.init(chartDom);

    const option = {
        title: {
            text: 'Pagos por Departamento',
            top: 'top',
            left: 'center',
            textStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            },
            padding: [15, 0, 0, 0]
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#333',
            borderColor: '#999',
            borderWidth: 1,
            formatter: function (params) {
                var name = params[0].name;
                var value = params[0].value;
                return `<strong style="color: #ffffff;">${name}</strong>: $${value}`; 
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%'
        },
        xAxis: {
            type: 'category',
            data: ['Departamento A', 'Departamento B', 'Departamento C'],
            axisLabel: {
                interval: 0,
                rotate: 30,
                fontSize: 12,
                color: '#ffffff',
                formatter: function (value) {
                    return value.length > 10 ? value.substring(0, 10) + '...' : value;
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 12,
                color: '#ffffff'
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            }
        },
        series: [
            {
                name: 'Pagos',
                type: 'bar',
                data: [1200, 1900, 3000],
                color: '#4A90E2',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 12,
                    color: '#ffffff'
                },
                itemStyle: {
                    emphasis: {
                        color: '#7EC3E5'
                    },
                    borderColor: '#2C3E50',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                animationDuration: 1000
            }
        ]
    };

    myChart.setOption(option);

    // Nuevo gráfico circular para empleados
    const estadoChartDom = document.getElementById('estado');
    const estadoChart = echarts.init(estadoChartDom);

    const estadoOption = {
        title: {
            text: 'Estado de Empleados',
            top: 'top',
            left: 'center',
            textStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            },
            padding: [15, 0, 0, 0]
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: '#333',
            borderColor: '#999',
            borderWidth: 1,
            formatter: function (params) {
                return `<strong style="color: #ffffff;">${params.name}</strong>: ${params.value} empleados (${params.percent}%)`; 
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%'
        },
        series: [
            {
                name: 'Estado',
                type: 'pie',
                radius: '70%',
                avoidLabelOverlap: false,
                itemStyle: {
                    // borderColor: '#2C3E50',
                    // borderWidth: 1
                },
                label: {
                    show: true,
                    color: '#ffffff',
                    formatter: '{b}: {c}',
                    fontSize: 14
                },
                emphasis: {
                    itemStyle: {
                    }
                },
                data: [
                    { 
                        value: 35, 
                        name: 'Activos', 
                        itemStyle: { 
                            color: '#4A90E2'
                        } 
                    },
                    { 
                        value: 5, 
                        name: 'Inactivos', 
                        itemStyle: { 
                            color: '#FF5252'
                        } 
                    }
                ],
                animationDuration: 1000
            }
        ]
    };

    estadoChart.setOption(estadoOption);

    // Manejar el redimensionamiento para ambos gráficos
    window.addEventListener('resize', function() {
        myChart.resize();
        estadoChart.resize();
    });
});
