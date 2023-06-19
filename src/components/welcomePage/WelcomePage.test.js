import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import WelcomePage from "./WelcomePage"
import {imageList} from "../../constants"

test('Welcome Page render', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Создание графиков')).toBeInTheDocument();
    expect(screen.getByText('Настройка графиков')).toBeInTheDocument();
    expect(screen.getByText('Изменение таблицы')).toBeInTheDocument();
    imageList.forEach((e) => {
        expect(screen.getByTestId(e.src)).toBeInTheDocument();
    });
})
test('1', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('2', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('3', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('4', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('5', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('6', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('7', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();

})
test('8', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('9', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('10', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('11', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
test('12', async () => {
    render(<WelcomePage/>);
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
    expect(screen.getByText('Загрузка табличных данных')).toBeInTheDocument();
})
