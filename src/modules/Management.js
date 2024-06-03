import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadingRow from '../components/heading-row/HeadingRow';
import { NavigationWrapper } from '../components/sidebar/Navigation';
const Management = () => {
    const navigate = useNavigate();
    const menuOptions = [{ title: "Add Curriculum", route: "/add-curriculum" },
    { title: "Add Training", route: "/" },
    { title: "Assign Curriculum", route: "/assign-curriculum" }]

    return (<NavigationWrapper Child={<div>
        <HeadingRow heading="Management" />
        <div className="grid grid-cols-4 gap-20 flex-1">
            {
                menuOptions.map((option, index) => (<Card title={option.title} route={option.route} />))
            }
        </div>
    </div>} />);

    function Card({ title, route }) {
        return (<div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="p-6">
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {title}
                </h5>
                <p class="block font-sans text-left antialiased font-light leading-relaxed text-inherit">
                    The place is close to Barceloneta Beach and bus stop just 2 min by walk
                    and near to "Naviglio" where you can enjoy the main night life in
                    Barcelona.
                </p>
            </div>
            <div class="p-6 pt-0">
                <button
                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-orange-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick={() => {
                        console.log(route)
                        navigate(route)
                    }}>
                    Read More
                </button>
            </div>
        </div>)
    }
}

export default Management