import React from "react";
const AdvancedChart = (props) => {
    const { widgetProps, widgetPropsAny, timeToggler, graphToggler } = props;
    let containerId = "advanced-chart-widget-container";
    const ref = React.createRef();

    const data = {
        theme: "dark",
        width: "100%",
        "autosize": false,
        hide_legend: true,
        hide_side_toolbar: true,
        hide_top_toolbar: true,
        hide_volume: false,
        "symbol": "BINANCE:SOLUSDC",
        "interval": timeToggler,
        "timezone": "Etc/UTC",
        // "locale": "en",
        "enable_publishing": false,
        // "allow_symbol_change": true,
        "calendar": false,
        gridColor: "#121526",
        backgroundColor: "#121526",
        style: graphToggler,
        "support_host": "https://www.tradingview.com",
        "container_id": containerId
    };

    React.useEffect(() => {
        let refValue;
        if (ref.current) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            script.onload = () => {
                if (typeof TradingView !== "undefined") {
                    new TradingView.widget(Object.assign(Object.assign(data, widgetProps), widgetPropsAny));
                }
            };
            ref.current.appendChild(script);
            refValue = ref.current;
        }
        return () => {
            if (refValue) {
                while (refValue.firstChild) {
                    refValue.removeChild(refValue.firstChild);
                }
            }
        };
    }, [ref, widgetProps, widgetPropsAny, containerId, timeToggler]);
    return React.createElement("div", { id: containerId, ref: ref });
};
export default AdvancedChart;
