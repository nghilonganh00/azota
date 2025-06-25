import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "../../modules/grade/grade.entity";
import { Purpose } from "../../modules/purpose/purpose.entity";
import { Permission } from "../../modules/permission/permission.entity";
import { School } from "../../modules/school/school.entity";
import { Classgroup } from "../../modules/classgroup/classgroup.entity";
import { Subject } from "../../modules/subject/subject.entity";

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Purpose)
    private readonly purposeRepository: Repository<Purpose>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Classgroup)
    private readonly classgroupRepository: Repository<Classgroup>
  ) {}

  async seed() {
    this.logger.log("Starting database seeding...");

    try {
      await this.seedGrades();
      await this.seedPurposes();
      await this.seedSubjects();
      await this.seedPermissions();
      await this.seedSchools();
      await this.seedClassgroups();

      this.logger.log("Database seeding completed successfully!");
    } catch (error) {
      this.logger.error("Error during seeding:", error);
      throw error;
    }
  }

  private async seedGrades() {
    const existingGrades = await this.gradeRepository.count();
    if (existingGrades > 0) {
      this.logger.log("Grades already exist, skipping...");
      return;
    }

    const grades = [
      { name: "Lớp 1" },
      { name: "Lớp 2" },
      { name: "Lớp 3" },
      { name: "Lớp 4" },
      { name: "Lớp 5" },
      { name: "Lớp 6" },
      { name: "Lớp 7" },
      { name: "Lớp 8" },
      { name: "Lớp 9" },
      { name: "Lớp 10" },
      { name: "Lớp 11" },
      { name: "Lớp 12" },
    ];

    await this.gradeRepository.save(grades);
    this.logger.log("Grades seeded successfully");
  }

  private async seedPurposes() {
    const existingPurposes = await this.purposeRepository.count();
    if (existingPurposes > 0) {
      this.logger.log("Purposes already exist, skipping...");
      return;
    }

    const purposes = [
      { title: "Kiểm tra giữa kỳ", position: 1, semester: 1 },
      { title: "Kiểm tra cuối kỳ", position: 2, semester: 1 },
      { title: "Kiểm tra giữa kỳ", position: 3, semester: 2 },
      { title: "Kiểm tra cuối kỳ", position: 4, semester: 2 },
      { title: "Bài tập thực hành", position: 5, semester: -1 },
      { title: "Bài kiểm tra ngắn", position: 6, semester: -1 },
      { title: "Bài tập về nhà", position: 7, semester: -1 },
    ];

    await this.purposeRepository.save(purposes);
    this.logger.log("Purposes seeded successfully");
  }

  private async seedSubjects() {
    const existingSubjects = await this.subjectRepository.count();
    if (existingSubjects > 0) {
      this.logger.log("Subjects already exist, skipping...");
      return;
    }

    const subjects = [];
    for (let gradeId = 1; gradeId <= 5; gradeId++) {
      subjects.push(
        { subjectName: "Toán", gradeId },
        { subjectName: "Ngữ văn", gradeId },
        { subjectName: "Tiếng Anh", gradeId },
        { subjectName: "Công nghệ", gradeId },
        { subjectName: "GDCD", gradeId },
        { subjectName: "Tin học", gradeId }
      );
    }

    for (let gradeId = 6; gradeId <= 12; gradeId++) {
      subjects.push(
        { subjectName: "Toán", gradeId },
        { subjectName: "Ngữ văn", gradeId },
        { subjectName: "Tiếng Anh", gradeId },
        { subjectName: "Vật lý", gradeId },
        { subjectName: "Hóa học", gradeId },
        { subjectName: "Sinh học", gradeId },
        { subjectName: "Lịch sử", gradeId },
        { subjectName: "Địa lý", gradeId },
        { subjectName: "Công nghệ", gradeId },
        { subjectName: "GDCD", gradeId },
        { subjectName: "Tin học", gradeId }
      );
    }

    await this.subjectRepository.save(subjects);
    this.logger.log("Subjects seeded successfully");
  }

  private async seedPermissions() {
    const existingPermissions = await this.permissionRepository.count();
    if (existingPermissions > 0) {
      this.logger.log("Permissions already exist, skipping...");
      return;
    }

    const permissions = [{ name: "ASSIGN_EXAM" }, { name: "MARK_EXAM" }, { name: "MANAGE_STUDENT_LIST" }];

    await this.permissionRepository.save(permissions);
    this.logger.log("Permissions seeded successfully");
  }

  private async seedSchools() {
    const existingSchools = await this.schoolRepository.count();
    if (existingSchools > 0) {
      this.logger.log("Schools already exist, skipping...");
      return;
    }

    const schools = [
      { name: "Trường THPT Hà Nội", address: "123 Đường Nguyễn Trãi, Hà Nội" },
      { name: "Trường THPT TP. Hồ Chí Minh", address: "456 Đường Lê Lợi, TP. Hồ Chí Minh" },
      { name: "Trường THPT Đà Nẵng", address: "789 Đường Trần Phú, Đà Nẵng" },
      { name: "Trường THPT Hải Phòng", address: "321 Đường Hồng Bàng, Hải Phòng" },
      { name: "Trường THPT Cần Thơ", address: "654 Đường Ngô Quyền, Cần Thơ" },
    ];

    await this.schoolRepository.save(schools);
    this.logger.log("Schools seeded successfully");
  }

  private async seedClassgroups() {
    const existingClassgroups = await this.classgroupRepository.count();
    if (existingClassgroups > 0) {
      this.logger.log("Classgroups already exist, skipping...");
      return;
    }

    const classgroups = [{ id: -1, classgroupName: "Khác" }];

    await this.classgroupRepository.save(classgroups);
    this.logger.log("Classgroups seeded successfully");
  }
}
