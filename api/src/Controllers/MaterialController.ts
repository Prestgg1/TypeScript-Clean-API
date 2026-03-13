import "reflect-metadata";
import { Controller, Get, Delete, Route, Tags, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import {  MaterialService } from "@askorg/core/services";

@injectable()
@Route("material")
@Tags("Material")
export class MaterialController extends Controller {
  constructor(
    @inject(MaterialService) private materialService: MaterialService
  ) {
    super();
  }

  @Get("/")
  async getAll() {
    return this.materialService.getAll();
  }

  @Get("{id}")
  async getById(@Path() id: number) {
    return this.materialService.getById(id);
  }



  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.materialService.delete(id);
  }
}