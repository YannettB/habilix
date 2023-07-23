import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeManagementComponent } from './knowledge-management.component';

describe('KnowledgeManagementComponent', () => {
  let component: KnowledgeManagementComponent;
  let fixture: ComponentFixture<KnowledgeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnowledgeManagementComponent]
    });
    fixture = TestBed.createComponent(KnowledgeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
