import ProjectsImporter from "../service/ProjectsImporter";
import {createConnection} from "typeorm";

createConnection()
new ProjectsImporter().import()