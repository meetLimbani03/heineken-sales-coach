import React from 'react';
import { OutletDetails } from '../../types';
import { Icons } from '../../constants';

interface OutletSnapshotViewProps {
  outlet: OutletDetails;
}

const Section: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode, className?: string}> = ({ title, icon, children, className = "" }) => (
     <div className={`bg-white p-4 rounded-lg shadow-sm border ${className}`}>
         <div className="flex items-center mb-4 text-lg font-bold text-gray-800">
             {icon}
             <h2 className="ml-3">{title}</h2>
         </div>
         {children}
     </div>
);

const InfoItem: React.FC<{label: string, value: React.ReactNode}> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
    </div>
);

const MetricBox: React.FC<{title: string, ly: string | number, ytd: string | number}> = ({ title, ly, ytd }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center border">
        <h4 className="text-sm font-semibold text-gray-600">{title}</h4>
        <div className="mt-2 flex justify-around items-baseline">
            <div>
                <p className="text-xl font-bold text-gray-800">{ly}</p>
                <p className="text-xs text-gray-500">LY</p>
            </div>
            <div>
                <p className="text-xl font-bold text-gray-800">{ytd}</p>
                <p className="text-xs text-gray-500">YTD</p>
            </div>
        </div>
    </div>
);

const OutletSnapshotView: React.FC<OutletSnapshotViewProps> = ({ outlet }) => {
    const maxVolume = Math.max(...outlet.volumeTrend.map(v => v.sales), 1); // Avoid division by zero
    const brandLogos = Icons.BrandLogos;

    const brandColors: {[key: string]: string} = {
        Heineken: 'bg-green-600',
        Tiger: 'bg-blue-600',
        Guinness: 'bg-black',
        'Tiger Crystal': 'bg-blue-300',
        Erdinger: 'bg-yellow-800',
        Default: 'bg-gray-400'
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Column 1: Profile & Contract */}
            <div className="space-y-6 xl:col-span-1">
                <Section title="Outlet Profile" icon={<Icons.Building className="w-6 h-6 text-green-700"/>}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem label="Owner" value={outlet.owner} />
                        <InfoItem label="Outlets" value={outlet.outletCount} />
                        <InfoItem label="Address" value={outlet.address} />
                        <InfoItem label="Sales Rep" value={outlet.salesRep} />
                        <InfoItem label="Classification" value={outlet.classification} />
                        <InfoItem label="Outlet Type" value={outlet.outletType} />
                        <InfoItem label="Created Date" value={outlet.createdDate} />
                        <InfoItem label="Latest Order" value={outlet.latestOrderDate} />
                    </div>
                </Section>
                 <Section title="Contract Volume (HLs)" icon={<Icons.Calendar className="w-6 h-6 text-red-600"/>}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    {outlet.contractVolume.map(item => <th key={item.year} className="px-3 py-2 font-bold text-gray-600 text-center">{item.year}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                     {outlet.contractVolume.map(item => <td key={item.year} className="px-3 py-2 text-gray-800 text-center font-medium">{item.volume.toFixed(2)}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </Section>
            </div>

            {/* Column 2 & 3: Performance, Trends, etc. */}
            <div className="space-y-6 xl:col-span-2">
                <Section title="Group Performance" icon={<Icons.Target className="w-6 h-6 text-yellow-600"/>}>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <MetricBox title="Total Volume (HLs)" ly={outlet.performance.totalVolume.ly} ytd={outlet.performance.totalVolume.ytd} />
                        <MetricBox title="Channel Share" ly={`${outlet.performance.channelShare.ly}%`} ytd={`${outlet.performance.channelShare.ytd}%`} />
                        <MetricBox title="AMS" ly={outlet.performance.ams.ly} ytd={outlet.performance.ams.ytd} />
                     </div>
                </Section>
                
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Section title="Outlet Volume Trend (HLs)" icon={<Icons.Chart className="w-6 h-6 text-blue-600"/>}>
                        <div className="flex justify-around items-end h-48 space-x-2 p-2 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                            {outlet.volumeTrend.map((item) => (
                                <div key={item.year} className="flex-1 flex flex-col items-center justify-end group">
                                    <p className="text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity -mb-4">{item.sales.toFixed(2)}</p>
                                    <div 
                                        className="w-full bg-green-500 hover:bg-green-600 rounded-t-sm transition-colors"
                                        style={{ height: `${(item.sales / maxVolume) * 100}%` }}
                                        title={`${item.label} ${item.year}: ${item.sales.toFixed(2)}`}
                                    ></div>
                                    <p className="text-xs text-center mt-2 text-gray-500 font-semibold">{item.year}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    <Section title="Outlet Brand Split" icon={<Icons.PieChart className="w-6 h-6 text-purple-600"/>}>
                        <ul className="space-y-3">
                            {outlet.brandSplit.map(item => (
                                 <li key={item.brand}>
                                     <div className="flex items-center justify-between mb-1">
                                         <div className="flex items-center">
                                            {(brandLogos[item.brand] || brandLogos.Default)()}
                                             <span className="ml-3 text-sm font-semibold text-gray-700">{item.brand}</span>
                                         </div>
                                         <span className="text-sm font-bold text-gray-800">{item.percentage.toFixed(2)}%</span>
                                     </div>
                                     <div className="w-full bg-gray-200 rounded-full h-2">
                                         <div 
                                            className={`${brandColors[item.brand] || brandColors.Default} h-2 rounded-full`}
                                            style={{width: `${item.percentage}%`}}
                                         ></div>
                                     </div>
                                 </li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default OutletSnapshotView;