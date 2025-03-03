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
    <div className="flex flex-col items-center justify-center h-[250px] bg-gray-800 rounded-lg p-4">
      <div className="relative w-[200px] h-[100px] overflow-hidden">
        {/* Fondo del gauge */}
        <div className="absolute w-full h-[200px] rounded-full border-[10px] border-gray-600 top-0"></div>

        {/* Relleno del gauge (Aguja) */}
        <div
          className="absolute w-full h-[200px] rounded-full border-[10px] border-transparent border-t-[#F59E0B] border-r-[#F59E0B] top-0"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "center bottom",
            // Aseguramos que siempre la aguja esté visible y sea del color correcto
            borderTopColor: "#F59E0B", 
          }}
        ></div>

        {/* Punto central */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-[#1F2937] rounded-full transform -translate-x-1/2"></div>
      </div>

      {/* Mostrar el valor */}
      <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
      <div className="text-sm text-gray-400">{sensorName}</div>

      {/* Marcadores de la escala */}
      <div className="flex justify-between w-[200px] mt-2 text-orange-100">
        <span className="text-xs">{minValue}</span>
        <span className="text-xs text-orange-300">{(minValue + maxValue) / 2}</span>
        <span className="text-xs text-orange-900">{maxValue}</span>
      </div>
    </div>
  );
}
