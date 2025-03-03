"use client";

interface SensorGaugeProps {
  value: number;       // El valor actual del sensor
  minValue: number;    // El valor mínimo posible para ese sensor
  maxValue: number;    // El valor máximo posible para ese sensor
  sensorName: string;  // El nombre del sensor (ej. "RSSI", "Temperature")
}

export default function SensorGauge({
  value,
  minValue,
  maxValue,
  sensorName,
}: SensorGaugeProps) {
  // Calcular el ángulo de la aguja en función del valor
  const angle = ((value - minValue) / (maxValue - minValue)) * 180;

  return (
    <div className="flex flex-col items-center justify-center h-[250px]">
      <div className="relative w-[200px] h-[100px] overflow-hidden">
        {/* Fondo del gauge */}
        <div className="absolute w-full h-[200px] rounded-full border-[10px] border-gray-200 top-0"></div>

        {/* Relleno del gauge */}
        <div
          className="absolute w-full h-[200px] rounded-full border-[10px] border-transparent border-t-blue-500 border-r-blue-500 top-0"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "center bottom",
            borderLeftColor: angle > 90 ? "#3b82f6" : "transparent",
          }}
        ></div>

        {/* Punto central */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2"></div>
      </div>

      {/* Mostrar el valor */}
      <div className="mt-4 text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{sensorName}</div>

      {/* Marcadores de la escala */}
      <div className="flex justify-between w-[200px] mt-2">
        <span className="text-xs">{minValue}</span>
        <span className="text-xs">{(minValue + maxValue) / 2}</span>
        <span className="text-xs">{maxValue}</span>
      </div>
    </div>
  );
}
