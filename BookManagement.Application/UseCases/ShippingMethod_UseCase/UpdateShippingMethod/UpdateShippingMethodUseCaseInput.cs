﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookManagement.Application.UseCases.ShippingMethod_UseCase.UpdateShippingMethod
{
    public class UpdateShippingMethodUseCaseInput
    {
        public long Id { get; set; }
        public string? Name { get; set; }
    }
}
