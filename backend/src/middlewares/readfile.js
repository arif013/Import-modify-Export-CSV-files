import {promises as fs} from 'fs'
import csv from 'csvtojson'

// Converted the csv data to Json and exporting 
export async function readFile(filePath){

    try{
    const data = await fs.readFile(filePath)
    console.log(data)
    const jsonObj = await csv().fromString(data.toString())
        return jsonObj
    } catch(error){
        console.log(`Error occured reading file: ${error.message}`)
    }
}

