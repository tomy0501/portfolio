import type { Meta,StoryObj } from '@storybook/react'
import { Header } from './Header'


const meta: Meta<typeof Header> = {
    title: "utility/Header",
    component: Header,
    parameters: {
        layouts: "centered"
    },
    argTypes:{
        logout: { action: "submitted"},
        gotoHome: {action: "clicked"}
    }
}

export default meta;

type Story = StoryObj<typeof Header>

export const Default: Story ={
    args:{
        userName: "tommy"
    }
}