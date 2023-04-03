import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";

export interface ITestsService {
    create(createTestDto: CreateTestDto);
    update(id: number, updateTestDto: UpdateTestDto);
    remove(id: number);
    findOne(id: number);
    findAll();
}