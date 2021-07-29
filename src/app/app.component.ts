import { Component, OnInit } from '@angular/core';

interface Cost {
  title: string;
  titleType: 'Label' | 'Input';
  units: number;
  base: number;
}

interface Allocation {
  title: string;
  percentage: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  feePrecentage = 0.0;

  costDetails: Cost[] = [];
  revenueAllocations: Allocation[] = [];
  labourAllocations: Allocation[] = [];

  totalOverall = 0;
  totalCostWithFee = 0;
  totalRevenueAllocation = 0;
  totalLaborAllocation = 0;

  ngOnInit(): void {
    this.setupCostDetails();
    this.setupRevenueBasedAllocations();
    this.setupLabourBasedAllocations();
  }

  calcTotalCost() {
    return this.arrayTotal(this.costDetails.map((c) => c.units * c.base));
  }

  calcTotalCostWithPercentage() {
    this.totalCostWithFee = this.calcTotalCost() * (1 + +this.feePrecentage);
    return this.totalCostWithFee;
  }

  calcTotalRevenueAllocation() {
    this.totalRevenueAllocation = this.arrayTotal(
      this.revenueAllocations.map((a) => a.percentage * this.totalCostWithFee)
    );
    return this.totalRevenueAllocation;
  }

  calcTotalLaborAllocation() {
    const cost = this.costDetails[0];
    this.totalLaborAllocation = this.arrayTotal(
      this.labourAllocations.map((a) => a.percentage * cost.base * cost.units)
    );
    return this.totalLaborAllocation;
  }

  calcOverallTotal() {
    return (
      this.totalCostWithFee +
      this.totalRevenueAllocation +
      this.totalLaborAllocation
    );
  }

  arrayTotal(array: number[]) {
    return array.reduce((sum, curr) => sum + curr);
  }

  addNewRow() {
    const newRow: Cost = {
      title: '',
      titleType: 'Input',
      units: 0,
      base: 0,
    };
    this.costDetails.push(newRow);
  }

  printForm() {
    window.print();
  }

  setupCostDetails() {
    this.costDetails = [
      { title: 'Labor:', titleType: 'Label', units: 0, base: 0 },
      { title: 'Material:', titleType: 'Label', units: 0, base: 0 },
      { title: 'Equipment:', titleType: 'Label', units: 0, base: 0 },
      { title: 'Subcontract:', titleType: 'Label', units: 0, base: 0 },
    ];
  }

  setupLabourBasedAllocations() {
    this.labourAllocations = [
      { title: 'Small Tools', percentage: 0.055 },
      { title: 'Safety Awards', percentage: 0.025 },
      { title: 'Fringe Benefits', percentage: 0.18 },
    ];
  }

  setupRevenueBasedAllocations() {
    this.revenueAllocations = [
      { title: 'Umbrella& Pollution Insurance:', percentage: 0.0021 },
      { title: 'AGC Job Cost:', percentage: 0.000142 },
      { title: 'General Liability:', percentage: 0.002696 },
      { title: 'Safety Director:', percentage: 0.001 },
      { title: 'Data Processing:', percentage: 0.0084 },
    ];
  }
}
