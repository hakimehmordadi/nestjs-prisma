import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Test } from './entities/test.entity';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @ApiTags('tests')
  @ApiCreatedResponse({ type: Test })
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @Get()
  @ApiTags('tests')
  @ApiOkResponse({ type: Test, isArray: true })
  async findAll() {
    const result = await this.testsService.findAll();
    if (!result) {
      throw new NotFoundException(`Test records does not exist.`);
    }
    return result;
  }

  @Get(':id')
  @ApiTags('tests')
  @ApiCreatedResponse({ type: Test })
  async findOne(@Param('id') id: string) {
    const result = await this.testsService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`TestsRecord with ${id} does not exist.`);
    }
    return result;
  }

  @Patch(':id')
  @ApiTags('tests')
  @ApiCreatedResponse({ type: Test })
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(+id, updateTestDto);
  }

  @Delete(':id')
  @ApiTags('tests')
  @ApiCreatedResponse({ type: Test })
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id);
  }

}
