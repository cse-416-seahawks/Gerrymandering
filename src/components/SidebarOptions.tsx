import React from 'react';
import * as TbIcons from 'react-icons/tb'
import * as AiIcons from 'react-icons/ai'
import * as VscIcons from 'react-icons/vsc'

export const SideBarOptions = [
    {
        title : 'Home',
        path : '/',
        icon: <AiIcons.AiFillHome/>,
        cName : 'nav-text'
    },
    {
        title : 'Cluster Analysis',
        path : '/',
        icon: <VscIcons.VscGraphScatter/>,
        cName : 'nav-text'
    },
    {
        title : 'District Plans',
        path : '/',
        icon: <VscIcons.VscMap/>,
        cName : 'nav-text'
    },
    {
        title : 'Table 1',
        path : '/',
        icon: <TbIcons.TbTableAlias/>,
        cName : 'nav-text'
    },
    {
        title : 'Table 2',
        path : '/',
        icon: <TbIcons.TbTableShortcut/>,
        cName : 'nav-text'
    },


]

