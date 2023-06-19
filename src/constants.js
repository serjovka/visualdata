export const themes = {
    whiteTheme: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    },
    blackTheme: {
        name: "blackTheme",
        majorColor: "white",
        minorColor: "gray",
        backgroundColor: "black",
    },
    colorTheme: {
        name: "colorTheme",
        majorColor: "#beef00",
        minorColor: "green",
        backgroundColor: "#0049B7",
    },
    blueTanTheme: {
        name: "blueTanTheme",
        majorColor: "#e1b382",
        minorColor: "green",
        backgroundColor: "#12343b",
    },
    pinkBlueTheme: {
        name: "pinkBlueTheme",
        majorColor: "#161748",
        minorColor: "green",
        backgroundColor: "#fea49f",
    },
    redGoldTheme: {
        name: "redGoldTheme",
        majorColor: "#ff3a22",
        minorColor: "green",
        backgroundColor: "#c7af6b",
    },
};

export const chartsName = {
    "BasicLineChart": "Basic Line Chart",
    "BasicAreaChart": "Basic Area Chart",
    "BasicBarChart": "Basic Bar Chart",
    "CandlestickChart": "Candlestick Chart",
    "PieChart": "Pie Chart",
    "MapChart": "Map Chart",
    "Scatterplot": "Scatterplot",
}

export const chartsNameForMenu = {
    "BasicLineChart": {
        name: "Line Chart",
        description: "Линейная диаграмма или линейный график, также известный как кривая диаграмма, представляет собой тип диаграммы, которая отображает информацию в виде ряда точек данных, называемых 'маркерами', соединенных отрезками прямой линии.",
        example: "lineChart.png",
    },
    "BasicAreaChart": {
        name: "Area Chart",
        description: "Диаграмма площадей или график площадей отображает количественные данные в графическом виде. Она основана на линейной диаграмме. Область между осью и линией обычно подчеркивается цветами, текстурами и штриховками.",
        example: "areaChart.png",
    },
    "BasicBarChart": {
        name: "Bar Chart",
        description: "Диаграмма, представленная прямоугольными зонами, высоты или длины которых пропорциональны величинам, которые они отображают.",
        example: "barChart.png",
    },
    "CandlestickChart": {
        name: "Candlestick Chart",
        description: "Вид интервального графика и технический индикатор, применяемый главным образом для отображения изменений биржевых котировок акций, цен на сырьё и т. д.",
        example: "candlestickChart.png",
    },
    "PieChart": {
        name: "Pie Chart",
        description: "Круговая диаграмма представляет собой круговую статистическую диаграмму, разделенную на срезы для иллюстрации числовой пропорции. На круговой диаграмме длина дуги каждого среза пропорциональна величине, которую он представляет.",
        example: "pieChart.png",
    },
    "MapChart": {
        name: "Map Chart",
        description: "Диаграмма, который позволяет создать карту мира, конкретных стран или регионов и нанести на неё любые данные по вашему усмотрению.",
        example: "mapChart.png",
    },
    "Scatterplot": {
        name: "Scatterplot",
        description: "Диаграмма, которая представляет собой тип графика, который показывает корреляцию между двумя переменными. Он показывает данные точек в виде точек. Его можно нарисовать между непрерывной независимой переменной и другой переменной, которая зависит от предыдущей переменной или двух непрерывных независимых переменных.", 
        example: "scatterplot.png",
    },
}

export const imageList = [
    {name: "Basic Line Chart", src: "lineChart.png", subtitle: "white theme"},
    {name: "Basic Bar Chart", src: "barChartTan.png", subtitle: "blue-tan theme"},
    {name: "Basic Area Chart", src: "areaChart.png", subtitle: "white theme"},
    {name: "Basic Bar Chart", src: "barChart.png", subtitle: "white theme"},
    {name: "Candlestick Chart", src: "candlestickChart.png", subtitle: "white theme"},
    {name: "Pie Chart", src: "pieChart.png", subtitle: "white theme"},
    {name: "Map Chart", src: "mapChart.png", subtitle: "white theme"},
    {name: "Basic Area Chart", src: "areaChartColor.png", subtitle: "color theme"},
];

export const baseLineChartOptions = {
    x: "A", // given d in data, returns the (temporal) x-value
    y: "B", // given d in data, returns the (quantitative) y-value
    width: 640, // outer width, in pixels
    height: 400, // outer height, in pixels
    xLabel: "X", // a label for the x-axis
    yLabel: "Y", // a label for the y-axis
    color: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    }, // stroke color of line
    strokeWidth: 1.5, // stroke width of line, in pixels
    strokeOpacity: 1, // stroke opacity of line
};

export const basePieChartOptions = {
    name: "A", // given d in data, returns the (temporal) x-value
    value: "B", // given d in data, returns the (quantitative) y-value
    width: 640, // outer width, in pixels
    height: 400, // outer height, in pixels
    xLabel: "", // a label for the x-axis
    yLabel: "", // a label for the y-axis
    color: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    }, // stroke color of line
    strokeOpacity: 1, // stroke opacity of line
    innerRad: 0,
};

export const baseBarChartOptions = {
    x: "A", // given d in data, returns the (temporal) x-value
    y: "B", // given d in data, returns the (quantitative) y-value
    width: 640, // outer width, in pixels
    height: 400, // outer height, in pixels
    xLabel: "X", // a label for the x-axis
    yLabel: "Y", // a label for the y-axis
    color: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    }, // stroke color of line
    xPadding: 0.1, // stroke width of line, in pixels
    strokeOpacity: 1, // stroke opacity of line
};

export const candleStickChartOptions = {
    date: "A",
    open: "B",
    close: "E",
    high: "C",
    low: "D",
    width: 1000, // outer width, in pixels
    height: 600, // outer height, in pixels
    xLabel: "", // a label for the x-axis
    yLabel: "", // a label for the y-axis
    color: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    }, // stroke color of line
};

export const baseScatterplotOptions = {
    x: "B",
    y: "C",
    title: "A",
    r: 3, // (fixed) radius of dots, in pixels
    width: 1000, // outer width, in pixels
    height: 600, // outer height, in pixels
    xLabel: "", // a label for the x-axis
    yLabel: "", // a label for the y-axis
    color: {
        name: "whiteTheme",
        majorColor: "#55608f",
        minorColor: "gray",
        backgroundColor: "#e5eaf5",
    }, // stroke color of line
};

